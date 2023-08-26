

export default {

  formatDateTime(date) {
    const splitDate = date.split(' ')

    return `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]} ${splitDate[4]}`;
  },
  
}
