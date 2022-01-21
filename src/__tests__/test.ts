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
    timingFuncVal: [1, 0, 1, 0],
    delay: 0.5,
  })
  
  ThemeJs.SetThemeAnimation('defaultAnim', {
    IterationCount: 'infinite',
    Name: "Teste",
    direction: 'normal',
    duration: 2
  })

  expect(ThemeJs.Themes).toStrictEqual([
    {
      name: 'DarkTheme',
      white: '#fff',
      black: '#000',
      border: '#FF0000',
      defaultTrans: '10s ease 0s',
      defaultCubic: '2s cubic-bezier(1,0,1,0) 0.5s',
      defaultAnim: "infinite normal none running Teste 2s  0s"
    },
    {
      name: 'WhiteTheme',
      white: '#fff',
      black: '#000',
    },
  ])
  expect(ThemeJs.SelectedTheme).toBe(0)
})
