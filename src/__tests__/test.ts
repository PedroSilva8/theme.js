import ThemeJs from '../index'

test('Theme Creation', () => {
  ThemeJs.CreateTheme('DarkTheme', true)
  ThemeJs.SetThemeValue('white', '#fff')
  ThemeJs.SetThemeValue('black', '#000')
  ThemeJs.SetThemeValue('border', '#FF0000', 'DarkTheme')
  ThemeJs.CreateTheme('WhiteTheme')
  ThemeJs.SetThemeValue('white', '#fff', 'WhiteTheme')
  ThemeJs.SetThemeValue('black', '#000', 'WhiteTheme')

  ThemeJs.SetThemeTransition('defaultTrans', {
    duration: 10,
    timingFunc: 'ease',
  })

  ThemeJs.SetThemeTransition('defaultCubic', {
    duration: 2,
    timingFunc: 'cubic-bezier',
    cubicBezier: { a: 1, b: 0, c: 1, d: 0 },
    delay: 0.5,
  })

  expect(ThemeJs.Themes).toStrictEqual([
    {
      name: 'DarkTheme',
      white: '#fff',
      black: '#000',
      border: '#FF0000',
      defaultTrans: '10s ease ',
      defaultCubic: '2s cubic-bezier(1,0,1,0) 0.5s',
    },
    {
      name: 'WhiteTheme',
      white: '#fff',
      black: '#000',
    },
  ])
  expect(ThemeJs.SelectedTheme).toBe(0)
})
