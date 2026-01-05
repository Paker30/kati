import React from "react";
import { screen, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Header } from "./index";

const mockIsInit = vi.fn();
const mockSyncNow = vi.fn();
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
const mockPopulateBooks = vi
  .fn()
  .mockResolvedValue({ id: "fake id", rev: "fake rev" });
const mockStartAddingBook = vi
  .fn()
  .mockResolvedValue({ id: "fake id", rev: "fake rev" });
const mockErrorAddingBook = vi
  .fn()
  .mockResolvedValue({ id: "fake id", rev: "fake rev" });
const mockPushLocation = vi.fn();
let fakeLoading = false;
let fakeShowModal = false;
let fakeCredentials = {};

vi.mock("wouter", () => ({
  useLocation: () => [null, mockPushLocation],
}));
vi.mock("../page/New", () => ({
  New: () => <div>New</div>,
}));
vi.mock("../../hooks/useCredentials", () => ({
  useCredentials: () => ({ credentials: fakeCredentials }),
}));
vi.mock("../../hooks/useRemote", () => ({
  useRemote: () => ({
    sync: {
      isInit: mockIsInit,
      syncNow: mockSyncNow,
    },
  }),
}));
vi.mock("../../hooks/useModal", () => ({
  useModal: () => ({
    showModal: fakeShowModal,
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}));
vi.mock("../../hooks/useBooks", () => ({
  useBooks: () => ({
    populateBooks: mockPopulateBooks,
    loading: fakeLoading,
    startAddingBook: mockStartAddingBook,
    errorAddingBook: mockErrorAddingBook,
  }),
}));
const mocks = vi.hoisted(() => {
  return {
    getAll: vi.fn(),
    modalPortal: vi.fn(),
  };
});
vi.mock("../../services/books", () => ({
  getAll: mocks.getAll,
}));
vi.mock("../Modal", () => ({
  ModalPortal: mocks.modalPortal,
}));

describe("Header component", () => {
  beforeEach(() => {
    mockIsInit.mockRestore();
    mockSyncNow.mockRestore();
    mockOpenModal.mockRestore();
    mockPopulateBooks.mockRestore();
    mockStartAddingBook.mockRestore();
    mockErrorAddingBook.mockRestore();
    mockPushLocation.mockRestore();
    mocks.modalPortal.mockRestore();
    mocks.getAll.mockRestore();
    fakeCredentials = {};
    fakeShowModal = false;
  });

  test("render", async () => {
    render(<Header />);
    expect(mockOpenModal).toHaveBeenCalledTimes(0);
    expect(mockCloseModal).toHaveBeenCalledTimes(0);
    expect(mockIsInit).toHaveBeenCalledTimes(0);
    expect(mockSyncNow).toHaveBeenCalledTimes(0);
    expect(mockPopulateBooks).toHaveBeenCalledTimes(0);
    expect(mockStartAddingBook).toHaveBeenCalledTimes(0);
    expect(mockErrorAddingBook).toHaveBeenCalledTimes(0);
    expect(mockPushLocation).toHaveBeenCalledTimes(0);
    expect(mocks.modalPortal).toHaveBeenCalledTimes(0);
    expect(mocks.getAll).toHaveBeenCalledTimes(0);
    expect(screen.queryByText("Login")).not.toBeNull();
    expect(screen.queryByText("Sync")).toBeNull();
    expect(screen.queryByText("＋")).not.toBeNull();
    expect(screen.queryByText("Synchronizing")).toBeNull();
  });

  test("user has log in", () => {
    fakeCredentials = { token: "fakeToken" };
    render(<Header />);
    expect(screen.queryByText("Login")).toBeNull();
    expect(screen.queryByText("Sync")).not.toBeNull();
    expect(screen.queryByText("＋")).not.toBeNull();
  });

  test("modal is open", () => {
    fakeShowModal = true;
    render(<Header />);
    expect(mocks.modalPortal).toHaveBeenCalledTimes(1);
  });
});
