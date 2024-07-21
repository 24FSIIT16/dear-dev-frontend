interface Breadcrumb {
  label: string;
  href: string;
}

const getBreadcrumbs = (pathname: string | undefined): Breadcrumb[] => {
  if (!pathname) {
    return [{ label: 'Home', href: '/' }];
  }
  const breadcrumbs = pathname.split('/').filter((crumb) => crumb);

  const breadcrumbItems = breadcrumbs
    .filter((crumb) => !/^\d+$/.test(crumb))
    .map((crumb) => ({
      label: crumb.toUpperCase(),
      href: `/${breadcrumbs.slice(0, breadcrumbs.indexOf(crumb) + 1).join('/')}`,
    }));

  return [{ label: 'HOME', href: '/' }, ...breadcrumbItems];
};

export default getBreadcrumbs;
