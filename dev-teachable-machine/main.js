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
// import bootstrap from 'bootstrap';

// Number of classes to classify
const NUM_CLASSES = 3;
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

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();

    // Create video element that will contain the webcam image
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');


    this.selectCameras = document.createElement('select');
    this.selectCameras.className='form-select form-select-sm';
    this.selectCameras.addEventListener('change', () => {
      this.getMedia(this.selectCameras.value);
    })
    // Add video element to DOM
    // document.body.appendChild(this.video);
    // document.body.appendChild(this.selectCameras);
    document.getElementById('body').appendChild(this.video);
    document.getElementById('body').appendChild(this.selectCameras);

    // Create training buttons and info texts    
    const buttonTextArr= ["엄마 캡쳐", "아빠 캡쳐", "그외"]
    for (let i = 0; i < NUM_CLASSES; i++) {
      const div = document.createElement('div');
      document.getElementById('body').appendChild(div);
      div.style.marginBottom = '0px';
      div.style.marginTop = '10px';

      // Create training button
      const button = document.createElement('button');
      // button.className = 'btn btn-primary';
      // // const button  = new bootstrap.Button(buttonEl)
      // button.innerText = "Train " + i;
      button.className = 'btn btn-primary position-relative';
      button.innerText = buttonTextArr[i];
      const counterText = document.createElement('span');
      counterText.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
      counterText.innerText = 0;
      button.appendChild(counterText);
      div.appendChild(button);
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
      div.appendChild(infoText);
      this.infoTexts.push(infoText);
    }

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

        for (let i = 0; i < NUM_CLASSES; i++) {

          // The number of examples for each class
          const exampleCount = this.knn.getClassExampleCount();

          // Make the predicted class bold
          if (res.classIndex == i) {
            this.infoTexts[i].style.fontWeight = 'bold';
          } else {
            this.infoTexts[i].style.fontWeight = 'normal';
          }

          // Update info text
          if (exampleCount[i] > 0) {
            this.captureInfo[i].innerText = exampleCount[i];
            this.infoTexts[i].innerText = `examples - ${res.confidences[i] * 100}%`
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