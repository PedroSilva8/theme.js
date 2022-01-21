/** Theme Type */
type Theme = {
  [key: string]: string
}

const cssRegex = /[^0-9a-zA-Z-_]+/

type ThemeTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' | 'cubic-bezier' | 'step' | 'frames'

interface ThemeTransition {
  duration: number
  timingFunc?: ThemeTiming
  timingFuncVal?: number[]
  delay?: number
}

interface ThemeAnimation {
  delay?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'[]
  duration?: number
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'[]
  IterationCount?: number | 'infinite'
  Name?: string
  playState?: 'running' | 'paused'[]
  timingFunc?: ThemeTiming
  timingFuncVal?: number[]
}

export default class ThemeJs {
  /** List of all themes */
  static Themes: Theme[] = []

  /** Selected Theme Index */
  static SelectedTheme = -1

  /**
   * Get Current Theme
   * @returns returns the current theme, if nothing is selected returns an empty obj
   */
  static CurrentTheme() {
    return this.SelectedTheme === -1 ? {} : this.Themes[this.SelectedTheme]
  }

  /**
   * Change selected theme
   * @param name the name of the theme to select
   */
  static SetCurrentTheme(name: string) {
    this.SelectedTheme = this.Themes.findIndex((val) => val.name === name)
  }

  /**
   * Create a theme
   * @param name The name of the theme
   * @param setCurrent if true sets the new theme as current theme, false by default
   */
  static CreateTheme(name: string, setCurrent = false) {
    this.Themes.push({ name })
    if (setCurrent) 
      this.SelectedTheme = this.Themes.length - 1
  }

  static AddTheme(theme: Theme, setCurrent = false) {
    this.Themes.push(theme)
    if (setCurrent) 
      this.SelectedTheme = this.Themes.length - 1
  }

  /**
   * Delete all themes
   */
  static Clear() {
    this.SelectedTheme = -1
    this.Themes = []
  }

  /**
   * Load a theme from a file
   * @param theme The object to be loaded
   * @param setCurrent If it should set new theme as selected
   * @returns True if theme is valid, otherwise returns false
   */
  static LoadTheme(theme: unknown, setCurrent = false) {
    if (theme as Theme) {
      this.Themes.push(theme as Theme)
      if (setCurrent) 
        this.SelectedTheme = this.Themes.length - 1
      return true
    }
    return false
  }

  /**
   * Use this function to get a json string of the theme
   * @param themeName name of the theme, if not set defaults to the current theme
   * @returns a json string of the theme
   */
  static ThemeToJson(themeName?: string) {
    if (themeName && this.SelectedTheme == -1)
      return ""
    
    if (themeName)
      return JSON.stringify(this.CurrentTheme())

    const selTheme = this.Themes.find((val) => val.name === themeName)

    if (selTheme)
      return JSON.stringify(selTheme)
    else
      return ""
  }

  /**
   * Set the a value for the current or named theme
   * @param param the theme paramenter being changed
   * @param value the new value
   * @param themeName the theme being changed, leave undefined to change the current theme
   * @returns
   */
  static SetThemeValue(param: string, value: string, themeName?: string) {
    if (!themeName && this.SelectedTheme === -1) 
      return

    if (!themeName) 
      return (this.CurrentTheme()[param] = value)

    const selTheme = this.Themes.find((val) => val.name === themeName)

    if (selTheme) selTheme[param] = value
  }

  /**
   * Use this function to get the CSS var of a theme value
   * @param param name of the value you want the css var
   * @param type if you want the prefix rgb or not
   * @param spacing what you want to replace invalid characters
   * @returns the the css variable
   */
  static ThemeCssVar(param: string, type: 'NORMAL' | 'RGB', spacing = '-') {
    return '--' + (type == 'RGB' ? 'rgb-' : '') + param.replace(cssRegex, spacing.replace(cssRegex, ''))
  }

  /**
   * Set a transition for the current or named theme
   * @param param name of the value you want to set
   * @param trans the values of the transition
   * @param themeName the name of the theme to change, if undefined it goes fo the current
   */
  static SetThemeTransition(param: string, trans: ThemeTransition, themeName?: string) {
    if (!themeName && this.SelectedTheme === -1)
      return

    let cbVal = ''

    if (trans.timingFunc == 'cubic-bezier' && trans.timingFuncVal && trans.timingFuncVal.length != 0)
      cbVal += "(" + cbVal + trans.timingFuncVal.toString() + ")"

    const transVal = trans.duration + 's ' + (trans.timingFunc || '') + cbVal + ' ' + (trans.delay || '0') + 's'

    if (!themeName)
      return (this.CurrentTheme()[param] = transVal)

    const selTheme = this.Themes.find((val) => val.name === themeName)

    if (selTheme) 
      selTheme[param] = transVal
  }

    /**
   * Set a animation for the current or named theme
   * @param param name of the value you want to set
   * @param anim the values of the animation
   * @param themeName the name of the theme to change, if undefined it goes fo the current
   */
    static SetThemeAnimation(param: string, anim: ThemeAnimation, themeName?: string) {
      if (!themeName && this.SelectedTheme === -1)
        return
  
      let cbVal = ''
  
      if (anim.timingFunc == 'cubic-bezier' && anim.timingFuncVal && anim.timingFuncVal.length != 0)
        cbVal += "(" + cbVal + anim.timingFuncVal.toString() + ")"
  
      const transVal = (anim.IterationCount || 'infinite') + " " + (anim.direction || 'normal') + " " + (anim.fillMode || "none") + " " + (anim.playState || 'running') + " " + (anim.Name || '') + " " + (anim.duration || '1') + 's ' + (anim.timingFunc || '') + cbVal + ' ' + (anim.delay || '0' + 's')
  
      if (!themeName)
        return (this.CurrentTheme()[param] = transVal)
  
      const selTheme = this.Themes.find((val) => val.name === themeName)
  
      if (selTheme) 
        selTheme[param] = transVal
    }

  /**
   * Applys Theme To CSS
   * @param name The name of the theme to apply, leave undefined to apply selected theme
   * @param spacing The value used to replace invalid characters, - by default
   */
  static ApplyTheme(name?: string, spacing = '-') {
    let selTheme = name ? this.Themes.find((val) => val.name === name) : this.CurrentTheme()

    if (!selTheme) selTheme = {}

    for (const [key, val] of Object.entries(selTheme)) {
      if (key !== 'name') {
        document.documentElement.style.setProperty('--' + key.replace(cssRegex, spacing.replace(cssRegex, '')), val)
        if (/^#[0-9A-F]{6}$/i.test(val))
          document.documentElement.style.setProperty('--rgb-' + key.replace(cssRegex, spacing.replace(cssRegex, '')), this.hexToRgb(val))
      }
    }
  }

  /**
   * Function used to convert hex value to R, G, B
   * @param hex The hex being converted
   */
  static hexToRgb = (hex: string): string => {
    const arrBuff = new ArrayBuffer(4)
    const vw = new DataView(arrBuff)
    vw.setUint32(0, parseInt(hex.substring(1), 16), false)
    const arrByte = new Uint8Array(arrBuff)

    return arrByte[1] + ',' + arrByte[2] + ',' + arrByte[3]
  }
}
