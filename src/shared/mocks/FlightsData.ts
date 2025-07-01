import turkishAirlinesLogo from 'shared/assets/FlightsLogoComany/turkish-airlines-logo-png_seeklogo-366077.png'
import RyanairLogo from 'shared/assets/FlightsLogoComany/images.jpg'
import S7Logo from 'shared/assets/FlightsLogoComany/images.png'
import SwissLogo from 'shared/assets/FlightsLogoComany/images (1).png'
import LufthansaLogo from 'shared/assets/FlightsLogoComany/LZ046-lufthansa.jpg'

export type Flight = {
    id: string
    airline: string
    airlineLogo: string
    flightNumber: string
    codes: string[]
    from: {
      city: string
      iata: string
    }
    to: {
      city: string
      iata: string
    }
    isActive?: boolean
  }
  
export const flightsData: Flight[] = [
    {
      id: 'TK143',
      airline: 'Turkish Airlines',
      airlineLogo: turkishAirlinesLogo,
      flightNumber: 'TK143',
      codes: ['93247', 'TC-JFP'],
      from: { city: 'Sofia', iata: 'SOF' },
      to: { city: 'Beijing', iata: 'PEK' },
    },
    {
      id: 'RN1782',
      airline: 'Ryanair',
      airlineLogo: RyanairLogo,
      flightNumber: 'RN1782',
      codes: ['7842', 'D-AISP'],
      from: { city: 'Dublin', iata: 'DUB' },
      to: { city: 'Larnaca', iata: 'LCA' },
      isActive: true,
    },
    {
      id: 'S7124',
      airline: 'S7 Airlines',
      airlineLogo: S7Logo,
      flightNumber: 'S7124',
      codes: ['88015', 'RA-73415'],
      from: { city: 'Nice', iata: 'NCE' },
      to: { city: 'Tbilisi', iata: 'TBS' },
    },
    {
      id: 'LX318',
      airline: 'Swiss',
      airlineLogo: SwissLogo,
      flightNumber: 'LX318',
      codes: ['94102', 'HB-JHK'],
      from: { city: 'Porto', iata: 'OPO' },
      to: { city: 'Baku', iata: 'GYD' },
    },
    {
      id: 'LH1234',
      airline: 'Lufthansa',
      airlineLogo: LufthansaLogo,
      flightNumber: 'LH1234',
      codes: ['09036', 'D-AIXQ'],
      from: { city: 'Burgas', iata: 'BOJ' },
      to: { city: 'Muscat', iata: 'MCT' },
    },
]