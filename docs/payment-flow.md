# Razorpay Payment Integration & Order Lifecycle

## Payment Flow Sequence
1. **Checkout Initiation:** Customer reviews contact details, delivery address, and line items.
2. **Server-Side Authoritative Calculation:** Cart calculates subtotal, complimentary fall & pico, and free shipping above ₹1,999.
3. **Razorpay Order Creation:** Backend invokes `/api/payments/razorpay/create-order` with the integer amount in paise and generates a unique receipt identifier.
4. **Checkout Modal Execution:** Razorpay checkout is presented using `RAZORPAY_KEY_ID`.
5. **Signature Verification:** Upon payment callback, the backend validates the HMAC-SHA256 signature using `RAZORPAY_KEY_SECRET`.
6. **Immutable Snapshot Order Creation:** Upon verified payment confirmation, an immutable order snapshot (`SLSH-ORD-YYYY-XXXX`) is stored in MongoDB/LocalStorage.
7. **Inventory & QC Transition:** The order transitions through:
   `PENDING → CONFIRMED → PROCESSING (QC & Hemming) → SHIPPED → DELIVERED`
8. **Returns & Refunds:** If an eligible return is requested within 7 days, administrator inspection triggers a verified Razorpay refund directly to the customer's source account.
