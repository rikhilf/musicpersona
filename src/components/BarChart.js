import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const BarChart = ({ scores }) => {
  const data = {
    labels: ['O', 'C', 'E', 'A', 'N'],
    datasets: [
      {
        data: [
          scores.openness,
          scores.conscientiousness,
          scores.extraversion,
          scores.agreeableness,
          scores.neuroticism,
        ],
      },
    ],
  };

  return (
    <RNBarChart
      data={data}
      width={screenWidth - 32}
      height={220}
      yAxisSuffix=""
      fromZero
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
        style: { borderRadius: 16 },
      }}
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
};

export default BarChart; 