import { headerStringMap } from '@skyscanner-internal/global-components/header/helpers/string-mapper';

const headerData: Record<string, string> = {
  car_hire: "Car Hire",
  flights: "Flights",
  help_anchor_text: "Help",
  hotels: "Hotels",
  packages: "Packages",
  login: "Log in",
  saved_flights: "Saved flights, hotels and cars",
  skip_to_results: "Skip to results",
  user_preferences: "User preferences",
  user_account: "Account",
  navigation_tabs: "Navigation Tabs",
}


export const getHeaderStrings = headerStringMap(headerData)