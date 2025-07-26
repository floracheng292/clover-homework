import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Import the mocked modules to access the jest.fn() objects
import { getToolkit, getBackpack } from './utils/fetchData';
import { headerStringMap } from '@skyscanner-internal/global-components/header/helpers/string-mapper';

jest.mock('@skyscanner-internal/global-components/header', () => () => <div>Mock Header</div>);
jest.mock('@skyscanner-internal/global-components/header/helpers/string-mapper', () => ({
  headerStringMap: jest.fn(),
}));
jest.mock('@skyscanner/backpack-web/bpk-component-text', () => (props: any) => <div>{props.children}</div>);
jest.mock('saddlebag-logger', () => ({
  logError: jest.fn(),
  logOperationalEvent: jest.fn(),
  logWarn: jest.fn(),
}));
jest.mock('./utils/fetchData', () => ({
  getToolkit: jest.fn(),
  getBackpack: jest.fn(),
}));


describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock fetchData responses
    (getToolkit as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Backpack' },
      { id: '2', name: 'Global Components' },
      { id: '3', name: 'A11y' },
    ]);

    (getBackpack as jest.Mock).mockResolvedValue([
      { id: '1', name: 'Backpack Core' },
      { id: '2', name: 'Backpack Components' },
    ]);

    // Mock string-mapper logic
    (headerStringMap as jest.Mock).mockImplementation((headerStrings: any) => ({
      carHire: headerStrings.car_hire,
      flights: headerStrings.flights,
      helpAnchorText: headerStrings.help_anchor_text,
      hotels: headerStrings.hotels,
      packages: headerStrings.packages,
      login: headerStrings.login,
      savedFlights: headerStrings.S2L_Saved_Flights_Web,
      skipToResults: headerStrings.skip_to_results,
      userPreferences: headerStrings.ktxtUserPreferences,
      userAccount: headerStrings.user_account,
      navigationTabs: headerStrings.ktxtNavigationTabs,
    }));
  });


  it('renders the UX toolkit and Backpack headers', () => {
    render(<App />);
    expect(screen.getByText('UX toolkit')).toBeInTheDocument();
    expect(screen.getByText('Backpack')).toBeInTheDocument();
  });

  it('renders toolkit list items', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('A11y')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Backpack Core')).toBeInTheDocument();
    });
  })
})