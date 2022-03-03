export function autocomplete(data, args) {
  return data.servers;
}

/** @param {NS} ns **/
export async function main(ns) {
  if (ns.args.length === 0) {
    ns.toast(
      "getServerMaxMoney.js: Must provide 1 or more arguments to script",
      "error",
      2000
    );
    ns.tprint("Must provide 1 or more arguments to script");
    ns.exit();
  }
  ns.tprint(
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(ns.getServerMaxMoney(ns.args[0]))
  );
}
