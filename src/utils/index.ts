export function FormatCurrency(value: any){
  if(!isNaN(value) && value != null){
    const formattedValue = Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return formattedValue  
  }else{
    return '0,00'
  }
}

export function normalizeString(str: string){
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

export const compareItems = (a: any, b: any) => {
  if (!a.name || !b.name) return 0

  const [textA, numA] = a.name.split(/(\d+)/).filter(Boolean)
  const [textB, numB] = b.name.split(/(\d+)/).filter(Boolean)

  if (textA !== textB) return textA.localeCompare(textB)
  return parseInt(numA) - parseInt(numB)
}