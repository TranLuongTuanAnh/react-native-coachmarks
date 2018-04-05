# react-native-coachmasks

# How to use 
 ```
 
 const CM = [];
     CM.push(
      {
        tooltip: 'The first steps of your tutorial',
        position: {
          top:35,
          left: width - 58,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: 110,
          left: (width - 300) / 2,
        },
        style: {
          width: 50,
          height: 50,
          borderRadius: 30,
        },
      },
      {
        tooltip: 'The second steps of your tutorial',
        position: {
          top:height - 70,
          left: width - 91,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 210,
          left: (width - 300) / 2,
        },
        style: {
          width: 70,
          height: 70,
          borderRadius: 35,
        },
      },
      {
        tooltip: 'The third steps of your tutorial',
        position: {
          top:height - 70,
          left: width - 160,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 210,
          left: (width - 300) / 2,
        },
        style: {
          width: 70,
          height: 70,
          borderRadius: 35,
        },
      },
      {
        tooltip: 'The fourth steps of your tutorial',
        position: {
          top:height - 70,
          left: width - 225,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 210,
          left: (width - 300) / 2,
        },
        style: {
          width: 70,
          height: 70,
          borderRadius: 35,
        },
      },
      {
        tooltip: 'The last steps of your tutorial',
        position: {
          top:height - 75,
          left: width - 305,
        },
        tooltipPosition: {
          width: 300,
          height: 120,
          top: height - 210,
          left: (width - 300) / 2,
        },
        style: {
          width: 80,
          height: 80,
          borderRadius: 40,
        },
      },
    );
    
   
    <CoachMarks
      numberOfSteps={CM.length}
      coachMarks={CM}
      congratsText={"Welcome to react-native-coachmark!\n"+"It helps you easily create Coach Marks to enhance user experience"}
      congratsImage={require('./ic_public.png')}
      visible={true}
      onClose={() => {}}
    />
   
 ```
