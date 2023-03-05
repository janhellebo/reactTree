import React from 'react';
import DecisionTree from './decision-tree';
import { Text, View } from 'react-native';
import { trainingData, testData } from '.data/treeData';

const App = () => {
  
  
  var iris = require('js-datasets-iris');

  // console.log(iris.data);
  console.warn(trainingData[1]);

  //create test dataset
  var irisTest = new Array();

  for (let i=0; i<10; i++){
    irisTest.push(iris.data[i]);
    irisTest.push(iris.data[i+50]);
    irisTest.push(iris.data[i+100]);
  }

  //create training dataset
  var irisTrain = new Array();

  for (let i=0; i<40; i++){
    irisTrain.push(iris.data[i+10]);
    irisTrain.push(iris.data[i+60]);
    irisTrain.push(iris.data[i+110]);
  }


  //chatGPT
  //converting array of values into array of objects
  const keys = ["x1", "x2", "x3", "x4", "species"];

  const irisTestObj = irisTest.map((value) => {
    return value.reduce((acc, item, index) => {
      acc[keys[index]] = item;
      return acc;
    }, {});
  });

  const irisTrainObj = irisTrain.map((value) => {
    return value.reduce((acc, item, index) => {
      acc[keys[index]] = item;
      return acc;
    }, {});
  });

  // console.log(irisTestObj)
  // console.log(testData)


  //creating tree using training data
  const model = new DecisionTree('species', ['x1', 'x2', 'x3', 'x4'], irisTrainObj);


  // prints the generated tree
  // console.log('Generated decision tree:')
  // model.printTree()

  //calculating accuracy using test data
  var correct = 0;
  var wrong = 0;

  for (let i = 0; i < 30; i++){
    let X1 = irisTestObj[i]["x1"]
    let X2 = irisTestObj[i]["x2"]
    let X3 = irisTestObj[i]["x3"]
    let X4 = irisTestObj[i]["x4"]
    let Y = irisTestObj[i]["species"]

    let pred = Object.keys(model.classify({"x1":X1, "x2": X2, "x3":X3, "x4": X4}))

    if (pred == Y){
      correct++;
    }
    else {
      wrong++;
    }
  }

  // console.warn(correct);
  // console.warn(wrong);
  // console.warn(correct / (correct + wrong));

  result = correct / (correct + wrong);


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{
                    borderWidth: 2, borderColor: 'blue',
                    borderRadius: 10, backgroundColor: 'white',
                    padding: 5}}>
        <Text>
          There were {correct} correct answers and {wrong} wrong answers.
          The accuracy is: {result}
        </Text>
      </View>
    </View>
  );
};

export default App;