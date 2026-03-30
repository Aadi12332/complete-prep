import { showNotification } from '../common/APIComponents';

export const loadRazorpayScript = () =>
  new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const triggerRazorpay = async ({
  amount,
  name,
  email,
  contact,
  order_id,
  notes = {},
  onSuccess = () => {},
  onFailure = () => {},
  onCancel = () => {},
  onOpen = () => {},
  onBeforeOpen = () => {},
  testMode = true,
}) => {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    console.error('Razorpay SDK failed to load.');
    onFailure({ message: 'Unable to load Razorpay SDK' });
    return;
  }

  if (!amount || !name || !email) {
    console.error('Missing required payment parameters');
    showNotification({
      type: 'error',
      message: `Missing required payment parameters ${amount ? '' : 'amount'} ${
        name ? '' : 'name'
      } ${email ? '' : 'email'}`,
    });
    onFailure({ message: 'Missing required payment details' });
    return;
  }

  const key = testMode ? 'rzp_test_1DP5mmOlF5G5ag' : 'rzp_live_XXXXXXXXXXXXXXXX';

  onBeforeOpen?.();

  const options = {
    key,
    amount: amount * 100,
    currency: 'INR',
    name: 'CompletePrep',
    description: 'Cart Payment',
    order_id,
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name,
      email,
      contact,
    },
    notes,
    theme: {
      color: '#1e3a8a',
    },
    modal: {
      ondismiss: function () {
        onCancel();
      },
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
    timeout: 600,
  };

  try {
    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function (response) {
      onFailure(response.error);
    });

    rzp.on('payment.success', function (response) {
      onSuccess(response);
    });

    rzp.on('modal.open', function () {
      onOpen();
    });

    rzp.open();
  } catch (error) {
    console.error('Error triggering Razorpay:', error);
    onFailure({
      message: 'Something went wrong while opening Razorpay',
      error,
    });
  }
};
