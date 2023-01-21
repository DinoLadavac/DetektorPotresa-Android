import { fromObject, Observable } from '@nativescript/core'
import { startAccelerometerUpdates } from "nativescript-accelerometer"

export function ViewModel() {
  const viewModel = new Observable()
  viewModel.x = 10
  viewModel.y = 20
  viewModel.z = 30
  viewModel.shakeLabel = ""
  viewModel.shakeValue = 0
  var accelerometer = require("nativescript-accelerometer")
  var prevValues = {x: 0, y: 0, z: 0}
  var shakeTreshold = 0.15;

  accelerometer.startAccelerometerUpdates(function(data) {
    viewModel.set('x', data.x.toFixed(2))
    viewModel.set('y', data.y.toFixed(2))
    viewModel.set('z', data.z.toFixed(2))

    if(Math.abs(data.x - prevValues.x) > shakeTreshold || Math.abs(data.y - prevValues.y) > shakeTreshold || Math.abs(data.z - prevValues.z) > shakeTreshold)
    {
      viewModel.set("shakeLabel", "Detektirano Drhtanje");
      viewModel.set("shakeValue", Math.abs(data.y - prevValues.y).toFixed(2))
    }
    else{
      viewModel.set("shakeLabel", "Mirovanje");
      viewModel.set("shakeValue", "" )
    }

    prevValues.x = data.x
    prevValues.y = data.y
    prevValues.z = data.z
  }, { sensorDelay: "ui" })


  
  return viewModel
}