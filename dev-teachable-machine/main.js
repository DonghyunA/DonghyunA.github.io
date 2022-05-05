// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import "@babel/polyfill";
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
// import "bootstrap-icons/font/bootstrap-icons.css"
// import "bootstrap-icons/font/bootstrap-icons"
// import bootstrap from 'bootstrap';


// Webcam Image size. Must be 227. 
const IMAGE_SIZE = 227;
// K value for KNN
const TOPK = 10;


class Main {
  constructor() {
    // Initiate variables
    this.infoTexts = [];
    this.training = -1; // -1 when no class is being trained
    this.videoPlaying = false;
    this.myStream;
    this.captureInfo = [];

    this.trainingCountBtnDiv = document.getElementById('bodyCount')
    this.trainingCntText = document.createElement('div');
    this.trainingCnt = 2;

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();

    // Create video element that will contain the webcam image
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');


    this.selectCameras = document.createElement('select');
    this.selectCameras.className = 'form-select form-select-sm';
    this.selectCameras.addEventListener('change', () => {
      this.getMedia(this.selectCameras.value);
    })
    // Add video element to DOM
    // document.body.appendChild(this.video);
    // document.body.appendChild(this.selectCameras);
    document.getElementById('bodyVideo').appendChild(this.video);
    document.getElementById('bodySelect').appendChild(this.selectCameras);

    // Create training buttons and info texts    
    const numberOfTrainingSet = 3;
    this.drawCountButton();
    this.drawTrainingButton();

    this.getMedia();
    // Setup webcam
    // navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    //   .then((stream) => {
    //     this.video.srcObject = stream;
    //     this.myStream = stream;
    //     this.video.width = IMAGE_SIZE;
    //     this.video.height = IMAGE_SIZE;

    //     this.video.addEventListener('playing', () => this.videoPlaying = true);
    //     this.video.addEventListener('paused', () => this.videoPlaying = false);

    //   }).then(() => {
    //     this.getCameras();
    //   })

  }
  drawCountButton() {
    // document.getElementById('bodyCount').appendChild(this.trainingCountBtnDiv);
    this.trainingCountBtnDiv.style.marginBottom = '0px';
    this.trainingCountBtnDiv.style.marginTop = '10px';
    const minusBtn = document.createElement('i');
    minusBtn.className = "bi bi-dash col-auto align-self-center";
    minusBtn.style = "font-size: 2rem; color: cornflowerblue;"
    minusBtn.addEventListener("click", (e) => {
      if (this.trainingCnt > 2) {
        this.trainingCnt -= 1;
        this.trainingCntText.innerText = this.trainingCnt;
        this.removeTrainingButton();
        this.drawTrainingButton();
        this.knn.clearAllClasses();
        e.preventDefault();
      }
    })
    this.trainingCountBtnDiv.appendChild(minusBtn);

    this.trainingCntText.innerText = this.trainingCnt;
    this.trainingCntText.className = "col-auto align-self-center"
    this.trainingCountBtnDiv.appendChild(this.trainingCntText);

    const plusBtn = document.createElement('i');
    plusBtn.className = "bi bi-plus col-auto align-self-center";
    plusBtn.style = "font-size: 2rem; color: cornflowerblue;"
    plusBtn.addEventListener("click", (e) => {
      this.trainingCnt += 1;
      this.trainingCntText.innerText = this.trainingCnt;
      this.removeTrainingButton();
      this.drawTrainingButton();
      this.knn.clearAllClasses();
      e.preventDefault();

    })
    this.trainingCountBtnDiv.appendChild(plusBtn);


  }
  drawTrainingButton() {
    const buttonTextArr = ["엄마", "아빠", "할머니", "할아버지", "할머니", "할아버지", "고모", "고모부", "이모", "이모부"]
    for (let i = 0; i < this.trainingCnt; i++) {
      const trainingBtnDiv = document.createElement('div');
      document.getElementById('bodyTraining').appendChild(trainingBtnDiv);
      trainingBtnDiv.style.marginBottom = '0px';
      trainingBtnDiv.style.marginTop = '10px';

      // Create training button
      const button = document.createElement('button');
      // button.className = 'btn btn-primary';
      // // const button  = new bootstrap.Button(buttonEl)
      // button.innerText = "Train " + i;
      button.className = 'btn btn-primary position-relative';
      if (i>=buttonTextArr.length){
        button.innerText = `삼촌 ${i-buttonTextArr.length + 1}`;
      }
      else{
        button.innerText = buttonTextArr[i];
      }
      const counterText = document.createElement('span');
      counterText.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
      counterText.innerText = 0;
      button.appendChild(counterText);
      trainingBtnDiv.appendChild(button);
      this.captureInfo.push(counterText)

      // Listen for mouse events when clicking the button
      button.addEventListener('touchstart', (e) => {
        this.training = i;
        e.preventDefault();
      });
      button.addEventListener('mousedown', (e) => {
        this.training = i;
        e.preventDefault();
      });
      button.addEventListener('touchend', (e) => {
        this.training = -1;
        e.preventDefault();
      });
      button.addEventListener('mouseup', (e) => {
        this.training = -1
        e.preventDefault();
      }
      );

      // Create info text
      const infoText = document.createElement('span')
      infoText.innerText = " No examples added";
      trainingBtnDiv.appendChild(infoText);
      this.infoTexts.push(infoText);
    }
  }
  removeTrainingButton() {
    let e = document.getElementById('bodyTraining');
    let child = document.getElementById('bodyTraining').firstElementChild;
    while (child) {
      e.removeChild(child);
      child = e.firstElementChild;
    }
    this.infoTexts.length = 0;
    this.captureInfo.length = 0;
  }
  getMedia(deviceId) {
    const initialConstrains = {
      audio: false,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: false,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      ).then((stream) => {
        this.video.srcObject = stream;
        this.myStream = stream;
        this.video.width = IMAGE_SIZE;
        this.video.height = IMAGE_SIZE;
        this.video.addEventListener('playing', () => this.videoPlaying = true);
        this.video.addEventListener('paused', () => this.videoPlaying = false);
      })
        .then(() => {
          if (!deviceId) {
            this.getCameras();
          }
        })
        .then(() => {
          console.log(this);
          this.start();
        })
    } catch (e) {
    }
  }
  async bindPage() {
    this.knn = knnClassifier.create();
    this.mobilenet = await mobilenetModule.load();


  }

  async getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = this.myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;
        if (currentCamera.label === camera.label) {
          option.selected = true;
        }
        this.selectCameras.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.video.play();
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    console.log("stop");
    this.video.pause();
    cancelAnimationFrame(this.timer);
  }

  async animate() {
    if (this.videoPlaying) {
      // Get image data from video element
      const image = tf.fromPixels(this.video);

      let logits;
      // 'conv_preds' is the logits activation of MobileNet.
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      // Train class if one of the buttons is held down
      if (this.training != -1) {
        logits = infer();

        // Add current image to classifier
        this.knn.addExample(logits, this.training)
      }

      const numClasses = this.knn.getNumClasses();
      if (numClasses > 0) {

        // If classes have been added run predict
        logits = infer();
        const res = await this.knn.predictClass(logits, TOPK);

        for (let i = 0; i < this.trainingCnt; i++) {

          // The number of examples for each class
          const exampleCount = this.knn.getClassExampleCount();

          // Make the predicted class bold
          if (res.classIndex == i) {
            this.infoTexts[i].style.fontWeight = 'bold';
            this.infoTexts[i].style.fontSize = '2rem';
          } else {
            this.infoTexts[i].style.fontWeight = 'normal';
            this.infoTexts[i].style.fontSize = '1rem';
          }
          // console.log("cnt : " + this.trainingCnt + "  class : " + numClasses);
          // Update info text
          if (exampleCount[i] > 0) {
            this.captureInfo[i].innerText = exampleCount[i];
            this.infoTexts[i].innerText = `  ${Math.round(res.confidences[i].toFixed(2) * 100)}% 닮음`
          }
        }
      }

      // Dispose image when done
      image.dispose();
      if (logits != null) {
        logits.dispose();
      }
    }
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }
}

window.addEventListener('load', () => new Main());