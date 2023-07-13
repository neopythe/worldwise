interface FormatOptions {
  weekday?: boolean;
}

const formatDate = (date: string | null, options: FormatOptions = {}) => {
  if (!date) return null;

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  if (options.weekday) formatOptions.weekday = "long";

  return new Intl.DateTimeFormat("en", formatOptions).format(new Date(date));
};

export { formatDate };
