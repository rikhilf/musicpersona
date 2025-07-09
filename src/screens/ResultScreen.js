import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import BarChart from '../components/BarChart';
import ShareButton from '../components/ShareButton';

function getSummary(scores) {
  // Simple narrative: highest and lowest trait
  const traits = [
    { key: 'openness', label: 'Openness' },
    { key: 'conscientiousness', label: 'Conscientiousness' },
    { key: 'extraversion', label: 'Extraversion' },
    { key: 'agreeableness', label: 'Agreeableness' },
    { key: 'neuroticism', label: 'Neuroticism' },
  ];
  const sorted = [...traits].sort((a, b) => scores[b.key] - scores[a.key]);
  return `Your strongest trait is ${sorted[0].label}, while your lowest is ${sorted[4].label}.`;
}

const ResultScreen = ({ route }) => {
  const { scores } = route.params || {
    scores: {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    },
  };
  const cardRef = useRef();

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <View ref={cardRef} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 2 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Your Music Personality</Text>
        <BarChart scores={scores} />
        <Text style={{ marginTop: 16, fontSize: 16 }}>{getSummary(scores)}</Text>
      </View>
      <ShareButton viewRef={cardRef} />
    </View>
  );
};

export default ResultScreen; 