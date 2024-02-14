const hideSiblingsForPrint = (htmlBlocks, targetClass) => {
  for (let i = 0; i < htmlBlocks?.length; i++) {
    const isTargetBlock = htmlBlocks[i]?.querySelector(`.${targetClass}`);
    const isTargetElement = htmlBlocks[i]?.classList?.contains(targetClass);

    if (!isTargetBlock && !isTargetElement) {
      htmlBlocks[i].classList.add('hide-in-print');
    } else if (isTargetBlock) {
      hideSiblingsForPrint(htmlBlocks[i].children, targetClass);
    }
  }
};

export const managePrintTags = (type?) => {
  if (type === 'remove') {
    const collection = document.querySelectorAll('.hide-in-print');
    for (let i = 0; i < collection.length; i++) {
      collection?.[i].classList.remove('hide-in-print');
    }
    document.querySelector('body')?.classList.remove('print-enabled');

    return;
  }

  hideSiblingsForPrint(document.querySelector('body')?.children, 'transaction-history-print-area');
};
