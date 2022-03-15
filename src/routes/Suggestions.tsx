import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconHamburger from "../assets/shared/mobile/icon-hamburger.svg";
import IconClose from "../assets/shared/mobile/icon-close.svg";
import SvgIllustrationEmpty from "../assets/suggestions/illustration-empty.svg";
import SvgSuggestions from "../assets/suggestions/icon-suggestions.svg";
import Drawer from "../components/Drawer";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import { useAppSelector } from "../hooks";
import { Category } from "../slice";
import { uppercaseWords } from "../helper";

type SortBy =
  | "Most Upvotes"
  | "Least Upvotes"
  | "Most Comments"
  | "Least Comments";

export default function Suggestions() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("Most Upvotes");
  const [selectCategory, setSelectCategory] = useState<Category | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);
  const filteredProducts = Array.from(feedbacks.productRequests)
    .filter(
      (p) => selectCategory === undefined || p.category === selectCategory
    )
    .filter((p) => p.status === "suggestion")
    .sort((a, b) => {
      switch (sortBy) {
        case "Most Upvotes":
          return b.upvotes - a.upvotes;
        case "Least Upvotes":
          return a.upvotes - b.upvotes;
        case "Most Comments":
          return (b.comments?.length ?? 0) - (a.comments?.length ?? 0);
        case "Least Comments":
          return (a.comments?.length ?? 0) - (b.comments?.length ?? 0);
      }
    });

  return (
    <div className="bg-[#F7F8FD] lg:min-h-full">
      <div className="lg:max-w-6xl lg:gap-8 lg:mx-auto lg:flex-row md:min-h-screen md:p-10 md:gap-10 relative min-h-full flex flex-col">
        {/* header */}
        <div className="lg:w-56 lg:gap-6 lg:grid-cols-1 md:grid md:grid-cols-3 md:gap-[0.625rem] md:h-48 md:static z-20 sticky top-0">
          {/* title */}
          <div className="lg:h-32 md:items-end md:pb-6 md:h-full md:rounded-lg flex items-center justify-between h-[4.5rem] px-6 bg-fancy">
            <div>
              <div className="md:text-xl text-white font-bold">
                Frontend Mentor
              </div>
              <div className="md:text-base text-white text-sm opacity-75">
                Feedback Board
              </div>
            </div>
            <div className="md:hidden flex">
              <button
                type="button"
                title="openDrawer"
                className={showDrawer ? "hidden" : ""}
                onClick={() => setShowDrawer(true)}
              >
                <img src={IconHamburger} alt="" />
              </button>

              <button
                type="button"
                title="openDrawer"
                className={showDrawer ? "" : "hidden"}
                onClick={() => setShowDrawer(false)}
              >
                <img src={IconClose} alt="" />
              </button>
            </div>
          </div>

          {/* filter */}
          <div className="md:block hidden bg-white rounded-md">
            <div className="flex p-6  flex-wrap gap-x-2 gap-y-4">
              <div
                className={
                  "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                  (selectCategory === undefined
                    ? "bg-[#4661E6] text-white"
                    : "bg-[#F2F4FF] text-[#4661E6]")
                }
                onClick={() => setSelectCategory(undefined)}
              >
                All
              </div>
              {feedbacks.categories.map((c) => {
                return (
                  <div
                    className={
                      "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                      (selectCategory === c
                        ? "bg-[#4661E6] text-white "
                        : "bg-[#F2F4FF] text-[#4661E6] ")
                    }
                    key={c}
                    onClick={() => setSelectCategory(c)}
                  >
                    {c === "ui" || c === "ux"
                      ? c.toUpperCase()
                      : uppercaseWords(c)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* roadmap */}
          <div className="md:block hidden bg-white rounded-md p-6">
            <div className="flex items-center justify-between">
              <div className="text-[#3A4374] text-lg font-bold">Roadmap</div>
              <button
                type="button"
                className="text-[#4661E6] text-sm font-semibold underline"
                onClick={() => navigate("/roadmap")}
              >
                View
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {feedbacks.statuses
                .filter((stat) => stat.status !== "suggestion")
                .map((stat) => {
                  const result = feedbacks.productRequests.filter(
                    (p) => p.status === stat.status
                  );

                  return (
                    <div
                      key={stat.status}
                      className="grid items-center grid-cols-[auto_1fr_auto] gap-x-4"
                    >
                      <div
                        className={
                          "h-2 w-2 rounded-full " +
                          (stat.status === "planned" ? "bg-[#F49F85]" : "") +
                          (stat.status === "in-progress"
                            ? "bg-[#AD1FEA]"
                            : "") +
                          (stat.status === "live" ? "bg-[#62BCFA]" : "")
                        }
                      ></div>
                      <div className="text-[#647196]">
                        {uppercaseWords(stat.status)}
                      </div>
                      <div className="text-[#647196] font-bold">
                        {result.length}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <Drawer
          isOpen={showDrawer}
          onClickAwayHandler={() => setShowDrawer(false)}
        >
          <div className="pt-[4.5rem]">
            <div className="p-6 flex flex-col gap-6">
              {/* filter */}
              <div className="bg-white rounded-md p-6 flex flex-wrap gap-x-2 gap-y-4">
                <div
                  className={
                    "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                    (selectCategory === undefined
                      ? "bg-[#4661E6] text-white"
                      : "bg-[#F2F4FF] text-[#4661E6]")
                  }
                  onClick={() => setSelectCategory(undefined)}
                >
                  All
                </div>
                {feedbacks.categories.map((c) => {
                  return (
                    <div
                      className={
                        "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                        (selectCategory === c
                          ? "bg-[#4661E6] text-white "
                          : "bg-[#F2F4FF] text-[#4661E6] ")
                      }
                      key={c}
                      onClick={() => setSelectCategory(c)}
                    >
                      {c === "ui" || c === "ux"
                        ? c.toUpperCase()
                        : uppercaseWords(c)}
                    </div>
                  );
                })}
              </div>

              {/* roadmap */}
              <div className="bg-white rounded-md p-6">
                <div className="flex items-center justify-between">
                  <div className="text-[#3A4374] text-lg font-bold">
                    Roadmap
                  </div>
                  <button
                    type="button"
                    className="text-[#4661E6] text-sm font-semibold underline"
                    onClick={() => navigate("/roadmap")}
                  >
                    View
                  </button>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  {feedbacks.statuses
                    .filter((stat) => stat.status !== "suggestion")
                    .map((stat) => {
                      const result = feedbacks.productRequests.filter(
                        (p) => p.status === stat.status
                      );

                      return (
                        <div
                          key={stat.status}
                          className="grid items-center grid-cols-[auto_1fr_auto] gap-x-4"
                        >
                          <div
                            className={
                              "h-2 w-2 rounded-full " +
                              (stat.status === "planned"
                                ? "bg-[#F49F85]"
                                : "") +
                              (stat.status === "in-progress"
                                ? "bg-[#AD1FEA]"
                                : "") +
                              (stat.status === "live" ? "bg-[#62BCFA]" : "")
                            }
                          ></div>
                          <div className="text-[#647196]">
                            {uppercaseWords(stat.status)}
                          </div>
                          <div className="text-[#647196] font-bold">
                            {result.length}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        <div className="relative flex flex-col flex-1">
          {/* sort and add feedback */}
          <div className="flex-shrink-0 md:rounded-lg md:h-20 bg-[#373F68] text-white flex items-center justify-between py-2 px-6">
            <img
              className="md:block md:mr-4 hidden"
              src={SvgSuggestions}
              alt=""
            />
            <div className="md:block md:mr-8 text-lg font-bold hidden">
              {filteredProducts.length} Suggestion
            </div>
            <div className="md:flex-1 flex items-baseline text-sm">
              Sort by :{" "}
              {
                <select
                  name=""
                  id=""
                  title="sortBy"
                  className="bg-transparent border-0 text-sm font-bold outline-none"
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  value={sortBy}
                >
                  <option className="text-[#647196]" value="Most Upvotes">
                    Most Upvotes
                  </option>
                  <option className="text-[#647196]" value="Least Upvotes">
                    Least Upvotes
                  </option>
                  <option className="text-[#647196]" value="Most Comments">
                    Most Comments
                  </option>
                  <option className="text-[#647196]" value="Least Comments">
                    Least Comments
                  </option>
                </select>
              }
            </div>
            <button
              type="button"
              className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-sm font-bold"
              onClick={() => navigate("/feedbacks/new")}
            >
              + Add Feedback
            </button>
          </div>

          {/* feedbacks */}
          <div className="lg:py-6 lg:gap-5 md:px-0 px-6 py-8 flex flex-col gap-4 flex-1">
            {/* feedback card */}
            {filteredProducts.map((product) => (
              <FeedbackRequestCard key={product.id} product={product} />
            ))}

            {/* empty state */}
            {filteredProducts.length === 0 && (
              <div className="bg-white flex-1 rounded-lg flex flex-col items-center justify-center">
                <div>
                  <img src={SvgIllustrationEmpty} alt="illustartion empty" />
                </div>
                <div className="mt-12 text-[#3A4374] font-bold text-lg">
                  There is no feedback yet.
                </div>
                <div className="max-w-sm text-center text-[#647196] text-sm mt-4">
                  Got a suggestion? Found a bug that needs to be squashed? We
                  love hearing about new ideas to improve our app.
                </div>
                <button
                  type="button"
                  className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-sm text-white font-bold mt-6"
                  onClick={() => navigate("/feedbacks/new")}
                >
                  + Add Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
