import Page from '@/app/(templates)/page'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Rendering the Home page', () => {
  it('renders a buttons and checking their href attributes', () => {
        const mockPush = jest.fn();
        
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      prefetch: jest.fn(),
      query: {},
    });
    
    render(<Page />)
    const linkElementA = screen.getByText('ボタンA');
    expect(linkElementA).toHaveAttribute('href','/search')
    
    fireEvent.click(linkElementA);
    expect(mockPush).toHaveBeenCalledWith('/search');
  })

  it("Renders Correctly", () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
})