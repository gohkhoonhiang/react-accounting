const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 10);

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 10);

const years = [''].concat(
  Array.from(Array(maxDate.getFullYear() - minDate.getFullYear())).map((_, i) => {
    return (minDate.getFullYear() + i).toString();
  })
);

const months = ['', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

function formatDateYYYYMMDD(date) {
  if (date === null) {
    return '';
  }

  const year = date.getFullYear();
  const month = months[date.getMonth() + 1];
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export { minDate, maxDate, years, months, formatDateYYYYMMDD };
