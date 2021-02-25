import { StyleSheet } from 'react-native'

const colorPalette = {
  darkPrimary: '#05668d',
  lightPrimary: '#427aa1',
  offWhite: '#ebf2fa',
  darkSecondary: '#679436',
  lightSecondary: '#a5be00'
}

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.offWhite,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colorPalette.offWhite
  },
  centerTopContainer: {
    flex: 1,
    backgroundColor: colorPalette.offWhite,
    alignItems: 'center',
    paddingTop: 20
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 50,
    color: colorPalette.lightPrimary,
    marginBottom: 40
  },
  inputView: {
    width: '80%',
    backgroundColor: colorPalette.lightPrimary,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: 'white',
    fontSize: 18
  },
  confirmBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  confirmBtn: {
    width: '80%',
    backgroundColor: colorPalette.darkPrimary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  alternativeBtn: {
    width: '80%',
    backgroundColor: colorPalette.darkSecondary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textArea: {
    width: '90%',
    backgroundColor: colorPalette.lightPrimary,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10
  },
  textAreaText: {
    height: 100,
    color: 'white',
    fontSize: 18
  },
  centredText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colorPalette.lightPrimary,
    marginBottom: 10
  },
  buttonMargin: {
    marginBottom: 15
  },
  regularText: {
    fontSize: 20,
    marginTop: 15
  }
})

const homeStyles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  cafeShopRow: {
    marginBottom: 20,
    backgroundColor: colorPalette.darkPrimary
  },
  cafeButton: {
    marginBottom: 20
  },
  halfWidth: {
    width: '100%'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 10
  },
  cafeName: {
    fontSize: 25,
    color: colorPalette.offWhite,
    fontWeight: 'bold'
  },
  cafeNameContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15
  },
  heading: {
    alignItems: 'center'
  },
  reviewBody: {
    color: '#FFF',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  }
})

export { baseStyles, homeStyles, colorPalette }
