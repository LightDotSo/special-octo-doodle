// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

browser.runtime.sendMessage({ greeting: "hello" }).then(response => {
  // eslint-disable-next-line no-console
  console.log("Received response: ", response);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // eslint-disable-next-line no-console
  console.log("Received request: ", request);
});
