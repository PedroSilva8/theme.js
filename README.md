## theme.js
A theme library to help applications managing, loading and applying themes

## Installing
`npm i @pedro_s/theme.js`

## Usage

Simple example of creating a theme

```javascript
import ThemeJs from '@pedro_s/theme.js'
ThemeJs.CreateTheme("DarkMode", true)
ThemeJs.SetThemeValue("background", "#000")
ThemeJs.ApplyTheme()
```

Then to use a color all you had to do is to add a `var(--background)` or `var(--rgb-background)` to your css or use it directly on your code using  `ThemeJs.CurrentTheme()["background"]`

## Development
To build the library all you have to do is run the following commands

```
  yarn
  yarn build
```
