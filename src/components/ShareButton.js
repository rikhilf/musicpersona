import * as Sharing from 'expo-sharing';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { captureRef } from 'react-native-view-shot';

const ShareButton = ({ viewRef }) => {
  const handleShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.9,
      });
      await Sharing.shareAsync(uri);
    } catch (e) {
      // handle error
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={{ padding: 12, backgroundColor: '#20B2AA', borderRadius: 8 }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Share Result</Text>
    </TouchableOpacity>
  );
};

export default ShareButton; 