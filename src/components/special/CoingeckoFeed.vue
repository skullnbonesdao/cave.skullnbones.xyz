<template>
  <coingecko-coin-price-marquee-widget
    coin-ids="bitcoin,ethereum,solana,star-atlas,star-atlas-dao"
    currency="usd"
    background-color="#FFFFFF"
    locale="en"
  ></coingecko-coin-price-marquee-widget>
</template>

<script>
export default {
  name: "CoingeckoFeed",
  mounted() {
    let coingeckoscript = document.createElement("script");
    coingeckoscript.setAttribute(
      "src",
      "https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js"
    );
    document.head.appendChild(coingeckoscript);
  },
};
</script>

<style scoped></style>
