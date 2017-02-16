import React from 'react';
import {
  StyleSheet
} from 'react-native';


export const colors = {
  main: '#0097A7',
  mainDark: '#006064',
  cta: '#FF9800',
  mainText: '#FFFFFF',
  ctaText: '#FFFFFF',
  text: 'rgba(0, 0, 0, 0.87)',
  textLight: 'rgba(0, 0, 0, 0.57)'
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  toolbar: {
    height: 56,
    backgroundColor: colors.main,
    elevation: 1
  },
  fab: {
    backgroundColor: colors.cta,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    elevation: 5
  },
  fabText: {
    fontSize: 24,
    color: colors.ctaText
  },
  h1: {
    fontSize: 34,
    color: colors.text
  },
  h2: {
    fontSize: 30,
    color: colors.text
  },
  h3: {
    fontSize: 26,
    color: colors.text,
    fontWeight: 'bold'
  },
  subheader: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold'
  },
  subheader_color: {
    fontSize: 16,
    color: colors.cta,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    padding: 10
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  settingRowText: {
    color: colors.text,
    fontSize: 14
  },
  extraInfo: {
    color: colors.textLight,
    fontStyle: 'italic',
    fontSize: 12
  },
  statRow: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3'
  }
});

export default styles;