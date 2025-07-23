import { headerStringMap } from '@skyscanner-internal/global-components/header/helpers/string-mapper';

const headerData: Record<string, string> = {
  carHire: "Car Hire",
  flights: "Flights",
  helpAnchorText: "Help",
  hotels: "Hotels",
  packages: "Packages",
  login: "Log in",
  savedFlights: "Saved flights, hotels and cars",
  skipToResults: "Skip to results",
  userPreferences: "User preferences",
  userAccount: "Account",
  navigationTabs: "Navigation Tabs",
}


export const getHeaderStrings = headerStringMap(headerData)