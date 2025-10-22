/**
 * TPG Combined Route Data TypeScript Schema
 * 
 * This schema represents the combined data structure for TPG (Geneva Public Transport)
 * including stops, lines, routes, and geometries.
 */

/**
 * Geographic coordinate pair [latitude, longitude]
 */
export type Coordinate = [number, number];

/**
 * A single stop's information for a specific line and direction
 */
export interface StopLineDirection {
  /**
   * Directions this stop serves for this line.
   * Key: destination name (e.g., "Bout-du-Monde", "Lignon-Tours")
   * Value: zero-indexed position of this stop in that direction's route
   */
  directions: {
    [destinationName: string]: number;
  };
}

/**
 * Information about all lines that serve a particular stop
 */
export interface StopLines {
  /**
   * Lines that serve this stop, keyed by line number (e.g., "7", "20")
   */
  [lineNumber: string]: StopLineDirection;
}

/**
 * A single transit stop
 */
export interface Stop {
  /**
   * Latitude coordinate of the stop (WGS84)
   */
  lat: number;

  /**
   * Longitude coordinate of the stop (WGS84)
   */
  lon: number;

  /**
   * Lines that serve this stop
   */
  lines: StopLines;
}

/**
 * Collection of all stops, keyed by stop name
 */
export interface Stops {
  /**
   * Stop name (e.g., "Genève, Athénée")
   */
  [stopName: string]: Stop;
}

/**
 * Route directions (aller/retour) with ordered stop sequences
 */
export interface LineDirections {
  /**
   * Ordered list of stop names in the 'aller' (outbound) direction
   */
  aller: string[];

  /**
   * Ordered list of stop names in the 'retour' (return/inbound) direction
   */
  retour: string[];
}

/**
 * A single transit line
 */
export interface Line {
  /**
   * Display name of the line (e.g., "Line 7")
   */
  name: string;

  /**
   * Type of transit service
   * Examples: "Tram", "Bus", "Trolleybus", "Lignes interurbaines transfrontalières et autres partenaires"
   */
  type: string;

  /**
   * Hex color code for the line (e.g., "#5A1E82")
   */
  colour: string;

  /**
   * Array of [latitude, longitude] coordinate pairs representing the route path on a map.
   * This includes the combined geometry from both directions.
   */
  geometry: Coordinate[];

  /**
   * Route information for both directions of travel
   */
  directions: LineDirections;
}

/**
 * Collection of all lines, keyed by line number
 */
export interface Lines {
  /**
   * Line number (e.g., "7", "20", "91")
   */
  [lineNumber: string]: Line;
}

/**
 * Root combined data structure containing all TPG transit information
 */
export interface CombinedData {
  /**
   * Dictionary of all transit stops, keyed by stop name
   */
  stops: Stops;

  /**
   * Dictionary of all transit lines, keyed by line number
   */
  lines: Lines;
}

/**
 * Example usage:
 * 
 * ```typescript
 * import type { CombinedData } from './combined-data.schema';
 * 
 * const data: CombinedData = {
 *   stops: {
 *     "Genève, Athénée": {
 *       lat: 46.198380250093464,
 *       lon: 6.149549660620893,
 *       lines: {
 *         "7": {
 *           directions: {
 *             "Bout-du-Monde": 18,
 *             "Lignon-Tours": 8
 *           }
 *         }
 *       }
 *     }
 *   },
 *   lines: {
 *     "7": {
 *       name: "Line 7",
 *       type: "Tram",
 *       colour: "#5A1E82",
 *       geometry: [[46.198, 6.149], [46.199, 6.150]],
 *       directions: {
 *         aller: ["Stop 1", "Stop 2", "Stop 3"],
 *         retour: ["Stop 3", "Stop 2", "Stop 1"]
 *       }
 *     }
 *   }
 * };
 * ```
 */
