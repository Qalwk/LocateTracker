import turkishAirlinesLogo from 'shared/assets/FlightsLogoComany/turkish-airlines-logo-png_seeklogo-366077.png'
import RyanairLogo from 'shared/assets/FlightsLogoComany/images.jpg'
import S7Logo from 'shared/assets/FlightsLogoComany/images.png'
import SwissLogo from 'shared/assets/FlightsLogoComany/images (1).png'
import LufthansaLogo from 'shared/assets/FlightsLogoComany/LZ046-lufthansa.jpg'

export interface Flight {
    id: string
    airline: string
    airlineLogo: string
    flightNumber: string
    codes: string[]
    from: {
      city: string
      iata: string
      utc?: string
      distance?: number // в км
      duration?: string // "3h 1m"
      scheduled?: string
      actual?: string
      countryCode?: string
    }
    to: {
      city: string
      iata: string
      utc?: string
      distance?: number // в км
      duration?: string // "59m"
      scheduled?: string
      estimated?: string
      countryCode?: string
    }
    aircraft?: string
    speed?: string
    altitude?: string
    isActive?: boolean
}

export const flightsData: Flight[] = [
    {
      id: 'TK143',
      airline: 'Turkish Airlines',
      airlineLogo: turkishAirlinesLogo,
      flightNumber: 'TK143',
      codes: ['93247', 'TC-JFP'],
      from: {
        city: 'Sofia',
        iata: 'SOF',
        utc: 'UTC+2',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '07:10',
        actual: '07:18',
        countryCode: 'BG',
      },
      to: {
        city: 'Beijing',
        iata: 'PEK',
        utc: 'UTC+8',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '23:55',
        estimated: '00:05',
        countryCode: 'CN',
      },
      aircraft: 'Boeing 777-300ER',
      speed: '910 km/h',
      altitude: '12 200 m',
    },  
    {
      id: 'RN1782',
      airline: 'Ryanair',
      airlineLogo: RyanairLogo,
      flightNumber: 'RN1782',
      codes: ['7842', 'D-AISP'],
      from: {
        city: 'Dublin',
        iata: 'DUB',
        utc: 'UTC+0',
        distance: 3430,
        duration: '4h 50m',
        scheduled: '10:20',
        actual: '10:25',
        countryCode: 'IE',
      },
      to: {
        city: 'Larnaca',
        iata: 'LCA',
        utc: 'UTC+3',
        distance: 3430,
        duration: '4h 50m',
        scheduled: '16:10',
        estimated: '16:15',
        countryCode: 'CY',
      },
      aircraft: 'Boeing 737-800',
      speed: '850 km/h',
      altitude: '11 000 m',
      isActive: true,
    },
    {
      id: 'S7124',
      airline: 'S7 Airlines',
      airlineLogo: S7Logo,
      flightNumber: 'S7124',
      codes: ['88015', 'RA-73415'],
      from: {
        city: 'Nice',
        iata: 'NCE',
        utc: 'UTC+1',
        distance: 2950,
        duration: '3h 40m',
        scheduled: '13:30',
        actual: '13:32',
        countryCode: 'FR',
      },
      to: {
        city: 'Tbilisi',
        iata: 'TBS',
        utc: 'UTC+4',
        distance: 2950,
        duration: '3h 40m',
        scheduled: '18:10',
        estimated: '18:12',
        countryCode: 'GE',
      },
      aircraft: 'Airbus A320neo',
      speed: '830 km/h',
      altitude: '10 800 m',
    },
    {
      id: 'LX318',
      airline: 'Swiss',
      airlineLogo: SwissLogo,
      flightNumber: 'LX318',
      codes: ['94102', 'HB-JHK'],
      from: {
        city: 'Porto',
        iata: 'OPO',
        utc: 'UTC+0',
        distance: 4820,
        duration: '6h 15m',
        scheduled: '06:45',
        actual: '06:50',
        countryCode: 'PT',
      },
      to: {
        city: 'Baku',
        iata: 'GYD',
        utc: 'UTC+4',
        distance: 4820,
        duration: '6h 15m',
        scheduled: '15:00',
        estimated: '15:10',
        countryCode: 'AZ',
      },
      aircraft: 'Airbus A321',
      speed: '870 km/h',
      altitude: '11 500 m',
    },
    {
      id: 'LH1234',
      airline: 'Lufthansa',
      airlineLogo: LufthansaLogo,
      flightNumber: 'LH1234',
      codes: ['09036', 'D-AIXQ'],
      from: {
        city: 'Burgas',
        iata: 'BOJ',
        utc: 'UTC+2',
        distance: 3840,
        duration: '5h 20m',
        scheduled: '09:55',
        actual: '10:01',
        countryCode: 'BG',
      },
      to: {
        city: 'Muscat',
        iata: 'MCT',
        utc: 'UTC+4',
        distance: 3840,
        duration: '5h 20m',
        scheduled: '17:15',
        estimated: '17:22',
        countryCode: 'OM',
      },
      aircraft: 'Airbus A330-300',
      speed: '900 km/h',
      altitude: '12 000 m',
    },
    {
      id: 'TK143',
      airline: 'Turkish Airlines',
      airlineLogo: turkishAirlinesLogo,
      flightNumber: 'TK143',
      codes: ['93247', 'TC-JFP'],
      from: {
        city: 'Sofia',
        iata: 'SOF',
        utc: 'UTC+2',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '07:10',
        actual: '07:18',
        countryCode: 'BG',
      },
      to: {
        city: 'Beijing',
        iata: 'PEK',
        utc: 'UTC+8',
        distance: 7420,
        duration: '9h 45m',
        scheduled: '23:55',
        estimated: '00:05',
        countryCode: 'CN',
      },
      aircraft: 'Boeing 777-300ER',
      speed: '910 km/h',
      altitude: '12 200 m',
    },  
]