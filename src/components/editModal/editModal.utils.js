export const getThousandSeparatorFromCurreny = currency => {
  switch (currency) {
    case "€":
      return "."
    case "$":
      return ","

    default:
      return ","
  }
}

export const getDecimalSeparatorFromCurrency = currency => {
  switch (currency) {
    case "€":
      return ","
    case "$":
      return "."

    default:
      return "."
  }
}

export const getPrefixFromCurrency = currency => {
  switch (currency) {
    case "€":
      return ""
    case "$":
      return "$ "

    default:
      return ""
  }
}

export const getSuffixFromCurrency = currency => {
  switch (currency) {
    case "€":
      return " €"
    case "$":
      return ""

    default:
      return ""
  }
}
