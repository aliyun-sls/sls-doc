function getSidebar() {
  return [
    {
      text: 'Overview of SQL Functions',
      items: [{ text: 'Function Overview', link: '/en/sqlfunction/home' }],
    },
    {
      text: 'SQL syntax',
      items: [
        {
          text: 'group by',
          link: '/en/sqlfunction/home#group-by',
        },
        {
          text: 'order by',
          link: '/en/sqlfunction/home#order-by',
        },
        {
          text: 'case when and if',
          link: '/en/sqlfunction/home#case-when-and-if',
        },
        {
          text: 'having',
          link: '/en/sqlfunction/home#having',
        },
        {
          text: 'join',
          link: '/en/sqlfunction/home#join',
        },
        {
          text: 'nested subquery',
          link: '/en/sqlfunction/home#nested-subqueries',
        },
        {
          text: 'unnest',
          link: '/en/sqlfunction/home#unnest'
        },
      ],
    },
    {
      text: 'Functions',
      items: [
        {
          text: 'General comparison functions',
          link: '/en/sqlfunction/home#general-comparison-functions',
        },
        {
          text: 'General aggregate functions',
          link: '/en/sqlfunction/home#general-aggregate-functions',
        },
        {
          text: 'Date and time functions',
          link: '/en/sqlfunction/home#date-and-time-functions',
        },
        {
          text: 'String functions',
          link: '/en/sqlfunction/home#string-functions',
        },
        {
          text: 'JSON functions',
          link: '/en/sqlfunction/home#json-functions',
        },
        {
          text: 'Array functions',
          link: '/en/sqlfunction/home#array-functions',
        },
        {
          text: 'Map functions',
          link: '/en/sqlfunction/home#map',
        },
        {
          text: 'Regular expression functions',
          link: '/en/sqlfunction/home#regular-expression-functions',
        },
        {
          text: 'URL functions',
          link: '/en/sqlfunction/home#url-functions',
        },
        {
          text: 'Mathematical calculation functions',
          link: '/en/sqlfunction/home#mathematical-calculation-functions',
        },
        {
          text: 'Approximate functions',
          link: '/en/sqlfunction/home#approximate-functions',
        },
        {
          text: 'Interval-valued comparison functions and periodicity-valued comparison functions',
          link: '/en/sqlfunction/home#interval-valued-comparison-functions-and-periodicity-valued-comparison-functions',
        },
        {
          text: 'Window functions',
          link: '/en/sqlfunction/home#window-function',
        },
        {
          text: 'Bitwise functions',
          link: '/en/sqlfunction/home#bitwise-functions',
        },
        {
          text: 'Geospatial functions',
          link: '/en/sqlfunction/home#geospatial-functions',
        },
        {
          text: 'IP geolocation functions',
          link: '/en/sqlfunction/home#ip-geolocation-functions',
        },
        {
          text: 'Security check functions',
          link: '/en/sqlfunction/home#security-check-functions',
        },
        {
          text: 'Mobile number functions',
          link: '/en/sqlfunction/home#mobile-number-functions',
        },
        {
          text: 'Time series clustering functions',
          link: '/en/sqlfunction/home#time-series-clustering-functions',
        },
        {
          text: 'Smooth functions',
          link: '/en/sqlfunction/home#smooth-functions',
        },
      ],
    },
  ]
}

module.exports = getSidebar
