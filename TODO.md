## Loyalty Coins System Implementation

### Remaining Steps:
1. ✅ **Plan approved by user**
2. ✅ **Update src/context/AuthContext.jsx**: Add arenaCredits to user state, dummy users, earnCredits(), redeemCredits(), getRedeemableValue(). Persist in sessionStorage.
3. ✅ **Update src/context/ErpCrmContext.jsx**: In processCartCheckout, award credits via earnCredits(cartTotal) if user role=='user'.
4. **Update src/pages/Checkout.jsx**: Add redemption UI (input/slider), netTotal calc, redeem before payment, update Razorpay amount/netTotal display/PDF/processCartCheckout(netTotal).
5. **Update src/pages/Dashboard.jsx**: Dynamic credits display from user.arenaCredits.
6. **Test**: Login user, add to cart, checkout redeem, verify earn/display/persist.
7. **attempt_completion**

Progress: 5/7 complete (Core files updated: Auth, ErpCrm, Checkout, Dashboard).
