import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme/tokens';

type AppTextProps = TextProps & {
  children: React.ReactNode;
  weight?: keyof typeof theme.typography.weight;
  size?: keyof typeof theme.typography.size;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
};

export const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  weight = 'regular',
  size = 'm',
  color = theme.colors.text.primary,
  align = 'left',
  ...props
}) => {
  return (
    <Text
      style={[
        {
          fontWeight: theme.typography.weight[weight],
          fontSize: theme.typography.size[size],
          color: color,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
