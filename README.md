## theme.js
A theme library to help applications managing, loading and applying themes.

This library will create css variables for you.

This library will **NOT** create id's or classes for you.

## Installing
`npm i @pedro_s/theme.js`

## Supported

- [x] Variables
- [x] Transitions
- [x] Animations
- [ ] Keyframes

## Usage

Simple example of creating a theme

```javascript
import ThemeJs from '@pedro_s/theme.js'
ThemeJs.CreateTheme("DarkMode", true)
ThemeJs.SetThemeValue("background", "#000")
ThemeJs.ApplyTheme()
```

Then to use a color all you have to do is add a `var(--background)` or `var(--rgb-background)` to your css or use it directly on your code using  `ThemeJs.CurrentTheme()["background"]`

## Development
To build the library all you have to do is run the following commands

```
  yarn
  yarn build
```
