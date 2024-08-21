import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native';

interface UniversalImageProps extends ImageProps {
  defaultSource?: any;
  style?: ImageStyle;
  loadingIndicatorSize?: 'small' | 'large';
}

const UniversalImage: React.FC<UniversalImageProps> = ({
  source,
  defaultSource,
  style,
  loadingIndicatorSize = 'small',
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [source]);

  return (
    <View style={[styles.container, style]}>
      {loading && !error ? (
        <ActivityIndicator
          size={loadingIndicatorSize}
          style={styles.loadingIndicator}
        />
      ) : null}

      <Image
        source={error ? defaultSource : source}
        style={[styles.image, style]}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default UniversalImage;
