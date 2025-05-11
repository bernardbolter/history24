import variables from '@/style/vars.module.scss'

export function interpolate(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

export function decideColor(variables)  {
  var colors = []
  Object.keys(variables).forEach(key => {
      if (key !== '__checksum') {
          colors.push(variables[key])
      }
  })
  return colors[Math.floor(Math.random()*colors.length)]
}