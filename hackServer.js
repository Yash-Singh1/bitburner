export function autocomplete(data, args) {
	return data.servers.filter((server) => !args.includes(server));
}

/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length === 0) {
		ns.toast(
			'hackServer.js: Must provide 1 or more arguments to script',
			'error',
			2000
		);
		ns.tprint('hackServer.js: Must provide 1 or more arguments to script');
		ns.exit();
	}
	const target = ns.args[0];
	if (ns.args.length > 1) {
		for (const arg of ns.args) {
			ns.run('hackServer.js', 1, arg);
		}
		ns.tprint('Spread multiple arguments throughout different processes.');
		ns.exit();
	}
	let moneyThresh =
		(ns.getServer(target).serverGrowth / 100) *
		0.75 *
		ns.getServerMaxMoney(target);
	const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	const portsRequired = ns.getServerNumPortsRequired(target);
	const existingFiles = [];
	if (ns.fileExists('BruteSSH.exe', 'home')) {
		existingFiles.push('brutessh');
	}
	if (ns.fileExists('FTPCrack.exe', 'home')) {
		existingFiles.push('ftpcrack');
	}
	if (ns.fileExists('relaySMTP.exe', 'home')) {
		existingFiles.push('relaysmtp');
	}
	if (ns.fileExists('HTTPWorm.exe', 'home')) {
		existingFiles.push('httpworm');
	}
	if (ns.fileExists('SQLInject.exe', 'home')) {
		existingFiles.push('sqlinject');
	}
	if (portsRequired > 0) {
		if (existingFiles.length > 0) {
			ns[existingFiles[0]](target);
		} else {
			ns.toast('Could not reach require port level: ' + portsRequired);
			ns.tprint('Could not reach require port level: ' + portsRequired);
			ns.exit();
		}
	}
	if (portsRequired > 1) {
		if (existingFiles.length > 1) {
			ns[existingFiles[1]](target);
		} else {
			ns.toast('Could not reach require port level: ' + portsRequired);
			ns.tprint('Could not reach require port level: ' + portsRequired);
			ns.exit();
		}
	}
	if (portsRequired > 2) {
		if (existingFiles.length > 2) {
			ns[existingFiles[2]](target);
		} else {
			ns.toast('Could not reach require port level: ' + portsRequired);
			ns.tprint('Could not reach require port level: ' + portsRequired);
			ns.exit();
		}
	}
	if (portsRequired > 3) {
		if (existingFiles.length > 3) {
			ns[existingFiles[3]](target);
		} else {
			ns.toast('Could not reach require port level: ' + portsRequired);
			ns.tprint('Could not reach require port level: ' + portsRequired);
			ns.exit();
		}
	}
	if (portsRequired > 4) {
		if (existingFiles.length > 4) {
			ns[existingFiles[4]](target);
		} else {
			ns.toast('Could not reach require port level: ' + portsRequired);
			ns.tprint('Could not reach require port level: ' + portsRequired);
			ns.exit();
		}
	}
	ns.nuke(target);
	let times;
	while (true) {
		if (
			ns.getServerSecurityLevel(target) > securityThresh &&
			ns.hackAnalyzeChance(target) > 0.5
		) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			const multiplication = await ns.grow(target);
			if (
				ns.getServerMoneyAvailable(target) * Math.pow(multiplication, 3) <
				moneyThresh
			) {
				moneyThresh = -Infinity;
			}
		} else {
			await ns.hack(target);
		}
		if (times % 5 === 0) {
			moneyThresh =
				(ns.getServer(target).serverGrowth / 100) *
				0.75 *
				ns.getServerMaxMoney(target);
		}
		times++;
	}
}
