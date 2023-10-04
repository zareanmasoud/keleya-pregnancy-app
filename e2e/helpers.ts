import { by, expect, element } from "detox";

const elementById = (id: string) => {
  return element(by.id(id));
};

const expectElementByIdToBeVisible = async (id: string): Promise<void> => {
  await expect(elementById(id)).toBeVisible();
};

export { expectElementByIdToBeVisible, elementById };
