/**
 * Determines if the user is looking at the edit mode in AEM author.
 */
export const isAuthorMode = () => 
  document.head.querySelector('meta[property="cq:wcmmode"]')?.getAttribute('content') === 'edit';
