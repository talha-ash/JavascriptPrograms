function findDay(year, splittedDate, isSlash) {
    const { position } = year;
    if (position == 2) {
      return isSlash ? splittedDate[0] : splittedDate[1];
    } else {
      return splittedDate[2];
    }
  }
  
  function findYear(splittedDate) {
    return splittedDate.reduce(
      (acc, value, index) => {
        if (value.length > 3) {
          return { position: index, value: value };
        }
        return acc;
      },
      { position: 0, value: "" }
    );
  }
  
  function isValidDate(day, month, year) {
    if (day.length < 3 && month.length < 3 && year.length < 5) {
      return year + month + day;
    }
    return "";
  }
  
  function transformDateFormat(dates) {
    return dates.reduce((acc, date) => {
      const isSlashDate = date.includes("/") ? true : false;
      const splittedDate = isSlashDate ? date.split("/") : date.split("-");
      if (splittedDate.length > 2) {
        const yearWithPosition = findYear(splittedDate);
        const month = isSlashDate ? splittedDate[1] : splittedDate[0];
        const day = findDay(yearWithPosition, splittedDate, isSlashDate);
        const validDate = isValidDate(day, month, yearWithPosition.value);      
        return validDate ? [...acc, validDate] : acc;
      }
      return acc;
    }, []);
  }
  
  const result = transformDateFormat([
    "2010/02/20",
    "19/12/2016",
    "11-18-2012",
    "20130720",
  ]);
  
  console.log(result);
  