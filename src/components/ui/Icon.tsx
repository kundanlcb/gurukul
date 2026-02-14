import React from 'react';
import { StyleProp, ViewStyle, Text, TextStyle } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme/tokens';

export type IconLibrary = 'feather' | 'material' | 'material-community' | 'ionicons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  library?: IconLibrary;
  style?: StyleProp<TextStyle>; // Changed to TextStyle as icons are text
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = theme.colors.text.primary,
  library = 'feather',
  style,
}) => {
  const iconProps = {
    name,
    size,
    color,
    style,
  };

  try {
    switch (library) {
      case 'material':
        return <MaterialIcon {...iconProps} />;
      case 'material-community':
        return <MaterialCommunityIcon {...iconProps} />;
      case 'ionicons':
        return <IonIcon {...iconProps} />;
      case 'feather':
      default:
        return <FeatherIcon {...iconProps} />;
    }
  } catch (error) {
    console.warn('Vector icon failed to render:', error);
    return null; 
  }
};

// Gurukul Icon Mapping
export const AppIcons = {
  // Tab Navigation: Home, Calendar, Book, File/Doc, Profile
  home: { name: 'home', library: 'feather' as IconLibrary },
  homeActive: { name: 'home', library: 'feather' as IconLibrary }, // Filled version if available, else just color change
  
  attendance: { name: 'calendar', library: 'feather' as IconLibrary },
  attendanceActive: { name: 'calendar', library: 'feather' as IconLibrary },
  
  fee: { name: 'file-text', library: 'feather' as IconLibrary }, // Changed to file-text to match "Document"
  feeActive: { name: 'file-text', library: 'feather' as IconLibrary },
  
  results: { name: 'book-open', library: 'feather' as IconLibrary }, // Changed to book-open to match "Book"
  resultsActive: { name: 'book-open', library: 'feather' as IconLibrary },
  
  profile: { name: 'user', library: 'feather' as IconLibrary },
  profileActive: { name: 'user', library: 'feather' as IconLibrary },

  // Common UI
  back: { name: 'arrow-left', library: 'feather' as IconLibrary },
  close: { name: 'x', library: 'feather' as IconLibrary },
  menu: { name: 'menu', library: 'feather' as IconLibrary },
  search: { name: 'search', library: 'feather' as IconLibrary },
  filter: { name: 'filter', library: 'feather' as IconLibrary },
  edit: { name: 'edit-2', library: 'feather' as IconLibrary },
  delete: { name: 'trash-2', library: 'feather' as IconLibrary },
  add: { name: 'plus', library: 'feather' as IconLibrary },
  check: { name: 'check', library: 'feather' as IconLibrary },
  chevronRight: { name: 'chevron-right', library: 'feather' as IconLibrary },
  chevronDown: { name: 'chevron-down', library: 'feather' as IconLibrary },
  
  // Features
  notifications: { name: 'bell', library: 'feather' as IconLibrary },
  logout: { name: 'log-out', library: 'feather' as IconLibrary },
  settings: { name: 'settings', library: 'feather' as IconLibrary },
  
  // States
  success: { name: 'check-circle', library: 'feather' as IconLibrary },
  error: { name: 'alert-circle', library: 'feather' as IconLibrary },
  info: { name: 'info', library: 'feather' as IconLibrary },
};
