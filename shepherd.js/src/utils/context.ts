declare global {
  interface Window {
    opera: unknown;
  }
}

export function getContext(window: Window) {
  let context = {};
  if (window.navigator) {
    const userAgent = window.navigator.userAgent;
    context = {
      ...context,
      $os: os(window),
      $browser: browser(userAgent, window.navigator.vendor, !!window.opera),
      $referrer: window.document.referrer,
      $referring_domain: referringDomain(window.document.referrer),
      $device: device(userAgent),
      $current_url: window.location.href,
      $host: window.location.host,
      $pathname: window.location.pathname,
      $browser_version: browserVersion(
        userAgent,
        window.navigator.vendor,
        !!window.opera
      ),
      $screen_height: window.screen.height,
      $screen_width: window.screen.width,
      $screen_dpr: window.devicePixelRatio
    };
  }
  context = {
    ...context,
    $lib: 'js',
    // $lib_version: version,
    $insert_id:
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10),
    $time: new Date().getTime() / 1000 // epoch time in seconds
  };
  return context; // TODO: strip empty props?
}

function includes(haystack: string, needle: string): boolean {
  return haystack.indexOf(needle) >= 0;
}

function browser(userAgent: string, vendor: string, opera: boolean): string {
  vendor = vendor || ''; // vendor is undefined for at least IE9
  if (opera || includes(userAgent, ' OPR/')) {
    if (includes(userAgent, 'Mini')) {
      return 'Opera Mini';
    }
    return 'Opera';
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
    return 'BlackBerry';
  } else if (
    includes(userAgent, 'IEMobile') ||
    includes(userAgent, 'WPDesktop')
  ) {
    return 'Internet Explorer Mobile';
  } else if (includes(userAgent, 'SamsungBrowser/')) {
    // https://developer.samsung.com/internet/user-agent-string-format
    return 'Samsung Internet';
  } else if (includes(userAgent, 'Edge') || includes(userAgent, 'Edg/')) {
    return 'Microsoft Edge';
  } else if (includes(userAgent, 'FBIOS')) {
    return 'Facebook Mobile';
  } else if (includes(userAgent, 'Chrome')) {
    return 'Chrome';
  } else if (includes(userAgent, 'CriOS')) {
    return 'Chrome iOS';
  } else if (includes(userAgent, 'UCWEB') || includes(userAgent, 'UCBrowser')) {
    return 'UC Browser';
  } else if (includes(userAgent, 'FxiOS')) {
    return 'Firefox iOS';
  } else if (includes(vendor, 'Apple')) {
    if (includes(userAgent, 'Mobile')) {
      return 'Mobile Safari';
    }
    return 'Safari';
  } else if (includes(userAgent, 'Android')) {
    return 'Android Mobile';
  } else if (includes(userAgent, 'Konqueror')) {
    return 'Konqueror';
  } else if (includes(userAgent, 'Firefox')) {
    return 'Firefox';
  } else if (includes(userAgent, 'MSIE') || includes(userAgent, 'Trident/')) {
    return 'Internet Explorer';
  } else if (includes(userAgent, 'Gecko')) {
    return 'Mozilla';
  } else {
    return '';
  }
}

function browserVersion(
  userAgent: string,
  vendor: string,
  opera: boolean
): number | null {
  const regexList = {
    'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
    'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
    Chrome: /Chrome\/(\d+(\.\d+)?)/,
    'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
    'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
    Safari: /Version\/(\d+(\.\d+)?)/,
    'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
    Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
    Firefox: /Firefox\/(\d+(\.\d+)?)/,
    'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
    Konqueror: /Konqueror:(\d+(\.\d+)?)/,
    BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
    'Android Mobile': /android\s(\d+(\.\d+)?)/,
    'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
    'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
    Mozilla: /rv:(\d+(\.\d+)?)/
  };

  const browserString = browser(
    userAgent,
    vendor,
    opera
  ) as keyof typeof regexList;
  const regex: RegExp = regexList[browserString] || undefined;

  if (regex === undefined) {
    return null;
  }
  const matches = userAgent.match(regex);
  if (!matches) {
    return null;
  }
  return parseFloat(matches[matches.length - 2] as string);
}

function os(window: Window): string {
  const a = window.navigator.userAgent;
  if (/Windows/i.test(a)) {
    if (/Phone/.test(a) || /WPDesktop/.test(a)) {
      return 'Windows Phone';
    }
    return 'Windows';
  } else if (/(iPhone|iPad|iPod)/.test(a)) {
    return 'iOS';
  } else if (/Android/.test(a)) {
    return 'Android';
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
    return 'BlackBerry';
  } else if (/Mac/i.test(a)) {
    return 'Mac OS X';
  } else if (/Linux/.test(a)) {
    return 'Linux';
  } else if (/CrOS/.test(a)) {
    return 'Chrome OS';
  } else {
    return '';
  }
}

function device(userAgent: string): string {
  if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
    return 'Windows Phone';
  } else if (/iPad/.test(userAgent)) {
    return 'iPad';
  } else if (/iPod/.test(userAgent)) {
    return 'iPod Touch';
  } else if (/iPhone/.test(userAgent)) {
    return 'iPhone';
  } else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
    return 'BlackBerry';
  } else if (/Android/.test(userAgent)) {
    return 'Android';
  } else {
    return '';
  }
}

function referringDomain(referrer: string): string {
  const split = referrer.split('/');
  if (split.length >= 3) {
    return split[2] as string;
  }
  return '';
}
