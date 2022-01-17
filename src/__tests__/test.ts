import ThemeJs from '../index'

test('Theme Creation', () => {
  ThemeJs.CreateTheme('DarkTheme', true)
  ThemeJs.SetThemeValue('white', '#fff')
  ThemeJs.SetThemeValue('black', '#000')
  ThemeJs.SetThemeValue('border', '#FF0000', 'DarkTheme')
  ThemeJs.CreateTheme('WhiteTheme', false)
  ThemeJs.SetThemeValue('white', '#fff', 'WhiteTheme')
  ThemeJs.SetThemeValue('black', '#000', 'WhiteTheme')

  expect(ThemeJs.Themes).toStrictEqual([
    {
      name: 'DarkTheme',
      white: '#fff',
      black: '#000',
      border: '#FF0000',
    },
    {
      name: 'WhiteTheme',
      white: '#fff',
      black: '#000',
    },
  ])
  expect(ThemeJs.SelectedTheme).toBe(0)
})

test('Load Theme', () => {
  ThemeJs.Clear()
  ThemeJs.LoadTheme(
    __dirname + '/theme.json',
    () => {
      expect(ThemeJs.Themes).toStrictEqual([
        {
          name: 'BlueTheme',
          color: '#0000FF',
        },
      ])
    },
    () => {
      expect(ThemeJs.Themes).toStrictEqual([{ name: 'Error' }]) //Should Always Fail
    },
  )
})
