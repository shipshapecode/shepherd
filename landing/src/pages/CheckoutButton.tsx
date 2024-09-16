import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';

export function CheckoutButton() {
  return (
    <button onclick={async () => {
                      const { data, error } = await actions.checkout({
                        productPriceId: 'c27eb1ec-bc59-446e-8aab-6adf920f9962'
                      });
                      if (!error) navigate(data);
                    }}>
      Logout
    </button>
  );
}