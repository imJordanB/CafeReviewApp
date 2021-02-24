import I18n from 'ex-react-native-i18n'
import * as Localization from 'expo-localization'

import * as en from './en.json'
import * as fr from './fr.json'

I18n.fallbacks = true

I18n.translations = {
  en,
  fr
}

export function getLanguage () {
  try {
    const languageChoice = Localization.locale
    const choice = languageChoice.substr(0, 2)

    console.log('Choice: ' + choice)

    I18n.locale = choice
    I18n.initAsync()
  } catch (err) {
    console.log('Error getting language: ' + err)
  }
}

export function t (name) {
  return I18n.t(name)
}
