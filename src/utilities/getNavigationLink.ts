// Helper function to get URL from navigation link
export const getLinkUrl = (link: any) => {
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value.slug
  ) {
    return `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
  }
  return link.url || '/'
}
