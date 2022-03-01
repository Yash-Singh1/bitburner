/** @param {NS} ns **/
export async function main(ns) {
	const crimes = [
		'Heist',
		'Assassination',
		'Kidnap',
		'Grand Theft Auto',
		'Homicide',
		'Traffick Arms',
		'Deal Drugs',
		'Larceny',
		'Rob Store',
		'Shoplift',
		'Mug',
		'Bond Forgery',
		'Heist',
	];
	crimes.sort(
		(crimeA, crimeB) =>
			ns.getCrimeStats(crimeB).money / ns.getCrimeStats(crimeB).time -
			ns.getCrimeStats(crimeA).money / ns.getCrimeStats(crimeA).time
	);
	while (true) {
		numWorking = 0;
		while (
			numWorking !== crimes.length &&
			ns.getCrimeChance(crimes[numWorking]) <= 0.5
		) {
			numWorking++;
		}
		if (numWorking == crimes.length) {
			numWorking = 0;
		}
		const timeout = ns.commitCrime(crimes[numWorking]);
		await new Promise((r) => setTimeout(r, timeout));
	}
}
