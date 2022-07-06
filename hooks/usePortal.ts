// @ ts-check
import { useRef, useEffect } from "react";

const createRootElement = (id: string) => {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
};

const addRootElement = (rootElem: Element) => {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild
      ? document.body.lastElementChild.nextElementSibling
      : document.body.nextElementSibling
  );
};

const usePortal = (id: string) => {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }
    parentElem.appendChild(rootElemRef.current as Node);

    return () => {
      rootElemRef.current && rootElemRef.current.remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  };
  return getRootElem();
};

export default usePortal;
